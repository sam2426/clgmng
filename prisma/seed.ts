import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Professors
  const professors = await prisma.$transaction(
    [
      { firstName: 'Alan', lastName: 'Turing', email: 'aturing@example.edu' },
      { firstName: 'Grace', lastName: 'Hopper', email: 'ghopper@example.edu' },
      { firstName: 'Edsger', lastName: 'Dijkstra', email: 'edijkstra@example.edu' },
    ].map((p) =>
      prisma.professor.upsert({
        where: { email: p.email },
        update: {},
        create: p,
      }),
    ),
  );

  const [alan, grace] = professors;

  // Seed Students
  const students = await prisma.$transaction(
    [
      { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@student.example.edu' },
      { firstName: 'Donald', lastName: 'Knuth', email: 'dknuth@student.example.edu' },
      { firstName: 'Barbara', lastName: 'Liskov', email: 'bliskov@student.example.edu' },
    ].map((s) =>
      prisma.student.upsert({
        where: { email: s.email },
        update: {},
        create: s,
      }),
    ),
  );

  // Seed Courses
  const courses = await prisma.$transaction(
    [
      {
        code: 'CS101',
        title: 'Introduction to Computer Science',
        description: 'Basics of algorithms, data structures, and problem solving.',
        professorId: alan.id,
      },
      {
        code: 'CS201',
        title: 'Systems Programming',
        description: 'Memory, processes, concurrency, and low-level programming.',
        professorId: grace.id,
      },
      {
        code: 'CS301',
        title: 'Algorithms',
        description: 'Design and analysis of algorithms.',
        professorId: grace.id,
      },
    ].map((c) =>
      prisma.course.upsert({
        where: { code: c.code },
        update: {
          title: c.title,
          description: c.description,
          professorId: c.professorId,
        },
        create: c,
      }),
    ),
  );

  // Seed Enrollments
  const [ada, donald] = students;
  const [cs101, cs201] = courses;

  await prisma.$transaction([
    prisma.enrollment.upsert({
      where: { studentId_courseId: { studentId: ada.id, courseId: cs101.id } },
      update: { grade: 95 },
      create: { studentId: ada.id, courseId: cs101.id, grade: 95 },
    }),
    prisma.enrollment.upsert({
      where: { studentId_courseId: { studentId: ada.id, courseId: cs201.id } },
      update: { grade: 92 },
      create: { studentId: ada.id, courseId: cs201.id, grade: 92 },
    }),
    prisma.enrollment.upsert({
      where: { studentId_courseId: { studentId: donald.id, courseId: cs101.id } },
      update: { grade: 88 },
      create: { studentId: donald.id, courseId: cs101.id, grade: 88 },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


