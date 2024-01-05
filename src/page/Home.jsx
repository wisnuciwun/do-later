import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, FormControl, Card, Accordion } from 'react-bootstrap';
import { addNewTodo } from '../global/features/todoSlice';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Home = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todoReducer.todos)
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    let value = {
      title: title,
      description: description
    }
    dispatch(addNewTodo([...todos, value]))
  }

  console.log('fff', todos)

  return (
    <div>
      <Container fluid>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="todo-lists" className='text-light w-100' title="Todos">
            <div style={{ height: '450px', width: '500px' }}>
              <Accordion defaultActiveKey={0}>
                {
                  todos.map((v, index) => {
                    return (
                      <Accordion.Item className='mb-2' eventKey={index}>
                        <Accordion.Header>{v.title}</Accordion.Header>
                        <Accordion.Body className='text-left'>{v.description}</Accordion.Body>
                      </Accordion.Item>
                    )
                  })
                }
              </Accordion>
            </div>
          </Tab>
          <Tab style={{ color: 'white' }} eventKey="new-todo" title="Create new">
            <div style={{ height: '450px', width: '500px' }}>
              <form onSubmit={handleClick}>
                <div className='text-right'>
                  <FormControl onChange={(e) => settitle(e.target.value)} style={{ width: "500px" }} className='mb-1' placeholder='Write your task title' />
                  <FormControl onChange={(e) => setdescription(e.target.value)} className='mb-3' as='textarea' style={{ width: "500px", height: '300px' }} placeholder='Tell your task description' />
                  <Button type="submit" className='w-100'>Save todo</Button>
                </div>
              </form>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div >
  )
}

export default Home