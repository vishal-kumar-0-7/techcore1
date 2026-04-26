import prisma from '../lib/prisma.js';

const defaultPlans = [
  {
    name: 'Fixed Scope',
    tagline: 'Best for defined projects',
    description: 'You know exactly what you want. We scope it, price it, and deliver it — on time, on budget.',
    badge: null,
    features: ['Fixed timeline & budget', 'Detailed project scope doc', 'Milestone-based payments', '3 months post-launch support', 'Full source code & IP transfer', 'Weekly progress demos'],
    notIncluded: ['Scope changes mid-project', 'Ongoing feature development'],
    ctaLabel: 'Get a Quote',
    popular: false,
    order: 0,
    active: true,
  },
  {
    name: 'Dedicated Team',
    tagline: 'Best for ongoing products',
    description: 'A full-time team embedded in your workflow. You direct, we execute. Scale up or down monthly.',
    badge: 'Most Popular',
    features: ['2–8 dedicated engineers', 'Direct Slack & daily standups', 'Flexible scope — change anytime', 'Monthly billing, cancel anytime', 'Dedicated project manager', 'Weekly demos & sprint reviews', 'Full IP ownership', 'Priority support SLA'],
    notIncluded: [],
    ctaLabel: 'Start Now',
    popular: true,
    order: 1,
    active: true,
  },
  {
    name: 'MVP Sprint',
    tagline: 'Best for startups & validation',
    description: 'Ship a production-ready MVP in 6 weeks. Core features, clean code, ready for real users.',
    badge: '6-Week Delivery',
    features: ['6-week fixed timeline', 'Core feature set only', 'Production-ready codebase', 'Basic design system included', 'Launch support & deployment', '30-day bug fix warranty'],
    notIncluded: ['Ongoing development', 'Custom integrations'],
    ctaLabel: 'Launch My MVP',
    popular: false,
    order: 2,
    active: true,
  },
];

export async function getEngagementPlans(req, res) {
  try {
    let plans = await prisma.engagementPlan.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    // Seed defaults if DB is empty
    if (plans.length === 0) {
      await prisma.engagementPlan.createMany({ data: defaultPlans });
      plans = await prisma.engagementPlan.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
    }

    res.json(plans);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch plans.' });
  }
}

export async function getAllPlans(req, res) {
  try {
    const plans = await prisma.engagementPlan.findMany({ orderBy: { order: 'asc' } });
    res.json(plans);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch plans.' });
  }
}

export async function createPlan(req, res) {
  try {
    const plan = await prisma.engagementPlan.create({ data: req.body });
    res.status(201).json(plan);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create plan.' });
  }
}

export async function updatePlan(req, res) {
  try {
    const plan = await prisma.engagementPlan.update({ where: { id: req.params.id }, data: req.body });
    res.json(plan);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update plan.' });
  }
}

export async function deletePlan(req, res) {
  try {
    await prisma.engagementPlan.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted.' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete plan.' });
  }
}
