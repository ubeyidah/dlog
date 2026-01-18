import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, LOG_MOOD } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Create user
  const user = await prisma.user.create({
    data: {
      id: 'dlog-user-id',
      name: 'DLog User',
      email: 'dlog@dlog.com',
      emailVerified: true,
    },
  });

  // Create account
  await prisma.account.create({
    data: {
      id: 'dlog-account-id',
      accountId: 'dlog-account-id',
      providerId: 'local',
      userId: user.id,
    },
  });

  // Sample TipTap JSON content
  const tipTapContents = [
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Today was a productive day. I completed all my tasks on time.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Feeling inspired after reading a great book.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Grateful for the support from my team.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Energized and ready for new challenges.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'A peaceful morning with meditation.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Neutral day, nothing special happened.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Reflecting on past experiences.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Curious about new technologies.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Struggling with a difficult task today.' }],
        },
      ],
    }),
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Feeling tired after a long week.' }],
        },
      ],
    }),
  ];

  // Create daily logs
  const logs = [
    {
      title: 'Productive Day',
      content: tipTapContents[0],
      mood: LOG_MOOD.PRODUCTIVE,
      tags: ['work', 'productivity'],
      userId: user.id,
    },
    {
      title: 'Inspiring Read',
      content: tipTapContents[1],
      mood: LOG_MOOD.INSPIRED,
      tags: ['reading', 'inspiration'],
      userId: user.id,
    },
    {
      title: 'Grateful Moments',
      content: tipTapContents[2],
      mood: LOG_MOOD.GRATEFUL,
      tags: ['gratitude', 'team'],
      userId: user.id,
    },
    {
      title: 'Energy Boost',
      content: tipTapContents[3],
      mood: LOG_MOOD.ENERGIZED,
      tags: ['motivation', 'energy'],
      userId: user.id,
    },
    {
      title: 'Peaceful Morning',
      content: tipTapContents[4],
      mood: LOG_MOOD.PEACEFUL,
      tags: ['meditation', 'peace'],
      userId: user.id,
    },
    {
      title: 'Neutral Day',
      content: tipTapContents[5],
      mood: LOG_MOOD.NEUTRAL,
      tags: ['daily', 'routine'],
      userId: user.id,
    },
    {
      title: 'Reflective Thoughts',
      content: tipTapContents[6],
      mood: LOG_MOOD.REFLECTIVE,
      tags: ['reflection', 'thoughts'],
      userId: user.id,
    },
    {
      title: 'Curious Exploration',
      content: tipTapContents[7],
      mood: LOG_MOOD.CURIOUS,
      tags: ['learning', 'technology'],
      userId: user.id,
    },
    {
      title: 'Struggling Task',
      content: tipTapContents[8],
      mood: LOG_MOOD.STRUGGLING,
      tags: ['challenge', 'difficulty'],
      userId: user.id,
    },
    {
      title: 'Tired Evening',
      content: tipTapContents[9],
      mood: LOG_MOOD.TIRED,
      tags: ['rest', 'fatigue'],
      userId: user.id,
    },
  ];

  await prisma.dailyLog.createMany({
    data: logs,
  });

  console.log('Seeding completed: Created user, account, and 10 daily logs.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });