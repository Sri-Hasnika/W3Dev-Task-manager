// Mock database that persists during the session
interface Task {
    id: string
    userId: string
    title: string
    description: string
    completed: boolean
    category: string
    createdAt: string
    updatedAt: string
  }
  
  // In-memory storage (in production, this would be your PostgreSQL database)
  const mockTasks: Task[] = [
    // Some sample data for demo
    {
      id: "1",
      userId: "demo-user",
      title: "Learn React Basics",
      description: "Understand components, props, and state management",
      completed: false,
      category: "Learn React",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "demo-user",
      title: "Build a Todo App",
      description: "Create a simple todo application using React",
      completed: true,
      category: "Learn React",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  
  export const mockDb = {
    tasks: {
      findMany: (userId: string) => {
        return mockTasks.filter((task) => task.userId === userId)
      },
  
      create: (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
        const newTask: Task = {
          ...taskData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        mockTasks.push(newTask)
        return newTask
      },
  
      createMany: (tasksData: Omit<Task, "id" | "createdAt" | "updatedAt">[]) => {
        const newTasks = tasksData.map((taskData) => ({
          ...taskData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))
        mockTasks.push(...newTasks)
        return newTasks
      },
  
      findById: (id: string, userId: string) => {
        return mockTasks.find((task) => task.id === id && task.userId === userId)
      },
  
      update: (id: string, userId: string, updates: Partial<Task>) => {
        const taskIndex = mockTasks.findIndex((task) => task.id === id && task.userId === userId)
        if (taskIndex === -1) return null
  
        mockTasks[taskIndex] = {
          ...mockTasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        return mockTasks[taskIndex]
      },
  
      delete: (id: string, userId: string) => {
        const taskIndex = mockTasks.findIndex((task) => task.id === id && task.userId === userId)
        if (taskIndex === -1) return false
  
        mockTasks.splice(taskIndex, 1)
        return true
      },
  
      getStats: (userId: string) => {
        const userTasks = mockTasks.filter((task) => task.userId === userId)
        const completed = userTasks.filter((task) => task.completed)
        const pending = userTasks.filter((task) => !task.completed)
  
        const categories = userTasks.reduce((acc: any, task) => {
          if (!acc[task.category]) {
            acc[task.category] = { total: 0, completed: 0 }
          }
          acc[task.category].total++
          if (task.completed) {
            acc[task.category].completed++
          }
          return acc
        }, {})
  
        return {
          total: userTasks.length,
          completed: completed.length,
          pending: pending.length,
          categories,
        }
      },
    },
  }
  