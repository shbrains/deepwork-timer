import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'ntn_v58628656701DiUx0cBuI2CkcS1GecU0oOu5QyCz23o3F6'
})

const DATABASE_ID = '' // Add your database ID here

export const createSessionEntry = async ({
  focus,
  totalMins,
  deepworkMins,
  distractionMins,
  distractions
}) => {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Focus: {
          type: 'title',
          title: [{ type: 'text', text: { content: focus } }],
        },
        Date: {
          type: 'date',
          date: { start: new Date().toISOString() },
        },
        'Total MINS': {
          type: 'number',
          number: totalMins,
        },
        'Deepwork MINS': {
          type: 'number',
          number: deepworkMins,
        },
        'Distraction MINS': {
          type: 'number',
          number: distractionMins,
        },
        Distractions: {
          type: 'multi_select',
          multi_select: distractions.map(d => ({ name: d })),
        },
      },
    })
    return response
  } catch (error) {
    console.error('Error creating Notion entry:', error)
    throw error
  }
}

export const getSessionHistory = async () => {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })
    return response.results
  } catch (error) {
    console.error('Error fetching session history:', error)
    throw error
  }
} 