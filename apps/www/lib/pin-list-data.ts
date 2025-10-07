import { faker } from '@faker-js/faker'

// Set seed for consistent data generation
faker.seed(123)

const stages = ['Backlog', 'Ready', 'In progress', 'Review', 'Done']
const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Product Manager',
  'DevOps Engineer',
  'QA Engineer',
  'Data Scientist',
  'Mobile Developer',
  'Technical Lead',
]

const generateOwner = () => ({
  name: faker.person.fullName(),
  role: faker.helpers.arrayElement(roles),
})

const generateTask = (id: string) => ({
  id,
  title: faker.company.catchPhrase(),
  description: faker.lorem.paragraph(),
  stage: faker.helpers.arrayElement(stages),
  due: faker.helpers.arrayElement([
    'Due tomorrow',
    'Due next week',
    'Due next Monday',
    'Demo on Friday',
    'Present tomorrow',
    'Pending review',
    'Needs grooming',
    'ETA Friday',
    'This weekend',
    'Next month',
  ]),
  pinned: faker.datatype.boolean({ probability: 0.3 }),
  owner: faker.datatype.boolean({ probability: 0.8 })
    ? generateOwner()
    : undefined,
})

export const initialTaskList = {
  id: faker.string.uuid(),
  title: faker.company.buzzPhrase(),
  summary: faker.lorem.sentence(),
  tasks: Array.from({ length: 12 }, (_, index) =>
    generateTask(`task-${index + 1}`)
  ),
}
