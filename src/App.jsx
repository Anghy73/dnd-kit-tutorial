import { useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import User from './components/User'

function App () {
  const [people, setPeople] = useState([
    {
      name: 'Andy',
      id: 1
    },
    {
      name: 'Fazt',
      id: 2
    },
    {
      name: 'Bluu',
      id: 3
    }
  ])

  const handleDragEnd = (evt) => {
    const { active, over } = evt

    const oldIndex = people.findIndex(person => person.id === active.id)
    const newIndex = people.findIndex(person => person.id === over.id)

    const newOrder = arrayMove(people, oldIndex, newIndex)

    setPeople(newOrder)
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='w-3/6'>
        {/* // contexto de dnd-kit */}
        <DndContext
      // collisionDetection le dice de que forma va a estar reorganizando los elementos y closestCenter es una configuración que le pasamos
          collisionDetection={closestCenter}
      // detecta si un elemento a terminado de soltarse
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <h1>User List</h1>

          {/* Los elementos dentro de esta lista van a ser ordenables, este recibe un arrglo como item */}
          <SortableContext
      // item a ordenar
            items={people}
        // como se van a ordenar
            strategy={verticalListSortingStrategy}
          >
            {/* components */}
            {
          people.map(user => (
            <User key={user.id} user={user} />
          ))
        }
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

export default App
