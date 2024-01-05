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
      <div className='d-flex justify-content-between align-items-center mb-2 text-white'>
        <div className='d-block text-start w-50'>
          <h2><b className='text-white mb-3'>Do Later App</b></h2>
          <span style={{ fontSize: '12px' }} className=''>
            You can write all your todo here. But we don't responsible for your late progress,
            because we dont have alarm to notify you 😁
          </span>
        </div>
        <img style={{ width: '15%' }} src="/img-logo.png" alt="" />
      </div>
      <Container fluid className='border rounded p-2'>
        <Tabs
          defaultActiveKey="todo-lists"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="todo-lists" className='text-light w-100' title="Todos">
            <div>
              <Accordion defaultActiveKey={0}>
                {
                  todos.length != 0 ?
                    todos.map((v, index) => {
                      return (
                        <Accordion.Item className='mb-2' eventKey={index}>
                          <Accordion.Header>{v.title}</Accordion.Header>
                          <Accordion.Body className='text-left'>{v.description}</Accordion.Body>
                        </Accordion.Item>
                      )
                    })
                    :
                    <div style={{ height: '400px' }} className='w-100 d-flex justify-content-center align-items-center'>
                      <img src="https://meeting.iconpln.co.id/resources/images/notfound2.png" alt="" />
                    </div>
                }
              </Accordion>
            </div>
          </Tab>
          <Tab style={{ color: 'white' }} eventKey="new-todo" title="Create new">
            <div>
              <form onSubmit={handleClick}>
                <div className='text-right'>
                  <FormControl required onChange={(e) => settitle(e.target.value)} className='mb-2' placeholder='Write your task title' />
                  <FormControl required onChange={(e) => setdescription(e.target.value)} className='mb-3' as='textarea' style={{ height: '300px' }} placeholder='Tell your task description' />
                  <Button type="submit" className='w-100 mb-1'>Save todo</Button>
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