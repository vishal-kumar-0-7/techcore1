import prisma from '../lib/prisma.js';

// Public — only published
export async function getCaseStudies(req, res) {
  try {
    const { category } = req.query;
    const where = { published: true };
    if (category && category !== 'All') where.serviceCategory = category;

    const studies = await prisma.caseStudy.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(studies);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch case studies.' });
  }
}

export async function getCaseStudyById(req, res) {
  try {
    const study = await prisma.caseStudy.findUnique({ where: { id: req.params.id } });
    if (!study || !study.published) return res.status(404).json({ error: 'Not found.' });
    res.json(study);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch case study.' });
  }
}

// Admin
export async function getAllCaseStudies(req, res) {
  try {
    const studies = await prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(studies);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch case studies.' });
  }
}

export async function createCaseStudy(req, res) {
  const { title, clientName, serviceCategory, problem, solution, result, techStack, coverImage, gradientColor, featured, order } = req.body;
  if (!title || !serviceCategory || !problem || !solution || !result) {
    return res.status(400).json({ error: 'title, serviceCategory, problem, solution and result are required.' });
  }
  try {
    const study = await prisma.caseStudy.create({
      data: {
        title,
        clientName: clientName || null,
        serviceCategory,
        problem,
        solution,
        result,
        techStack: techStack || [],
        coverImage: coverImage || null,
        gradientColor: gradientColor || 'from-indigo-500 to-purple-600',
        featured: featured || false,
        order: order || 0,
      },
    });
    res.status(201).json(study);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create case study.' });
  }
}

export async function updateCaseStudy(req, res) {
  const { id } = req.params;
  try {
    const study = await prisma.caseStudy.update({ where: { id }, data: req.body });
    res.json(study);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update case study.' });
  }
}

export async function deleteCaseStudy(req, res) {
  try {
    await prisma.caseStudy.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted.' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete case study.' });
  }
}
