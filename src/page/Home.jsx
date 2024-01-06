import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, FormControl, Card, Accordion } from 'react-bootstrap';
import { changeTodosData } from '../global/features/todoSlice';
import { useRef, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const notify = (text = 'Success') => toast(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: false,
    theme: "light",
  });;
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todoReducer.todos)
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [idEdit, setidEdit] = useState(null)
  const [titleButtonRight, settitleButtonRight] = useState('Create new')
  const [activeTab, setactiveTab] = useState('todo-lists')

  const handleClick = (e) => {
    e.preventDefault()

    if (titleButtonRight == 'Edit todo') {
      onHandleEdit()
    } else {
      let value = {
        title: title,
        description: description,
        date: moment().format('DD MMM YYYY HH:mm:ss'),
        finished: false
      }
      settitleButtonRight('Create new')
      settitle('')
      setdescription('')
      dispatch(changeTodosData([...todos, value]))
      notify('You have successfully add a todo')
    }
  }

  const onHandleDelete = (index) => {
    let newArray = [...todos];
    newArray.splice(index, 1)
    dispatch(changeTodosData(newArray))
    notify('You have successfully remove the todo')
  }

  const onHandleEdit = () => {
    let newData = {
      title: title,
      description: description,
      date: moment().format('DD MMM YYYY HH:mm:ss'),
      finished: false
    }
    let newArray = [...todos]
    newArray[idEdit] = newData
    dispatch(changeTodosData(newArray))
    notify('You have successfully changes the todo')
  }

  const onHandleFinishTask = (v, id) => {
    let newData = { ...v, finished: !v.finished }
    let newArray = [...todos]
    newArray[id] = newData
    dispatch(changeTodosData(newArray))
    notify(!v.finished ? 'You have successfully finished the todo' : 'You undo your task')
  }

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
          className="mb-3 customTab"
          fill
          activeKey={activeTab}
          onSelect={(key) => setactiveTab(key)}
        >
          <Tab eventKey="todo-lists" className='text-light w-100' title="Todos">
            <div style={{ height: '400px', overflowY: 'auto' }}>
              <Accordion>
                {
                  todos.length != 0 ?
                    todos.map((v, index) => {
                      return (
                        <Accordion.Item className='mb-2' eventKey={index}>
                          <Accordion.Header>
                            <div className='d-flex gap-4 align-items-center'>
                              <div className={`round-div ${v.finished ? 'bg-success finished' : 'bg-warning'} d-flex align-items-center justify-content-center`}>
                                {
                                  v.finished ?
                                    <span className="material-symbols-outlined text-white">
                                      done_all
                                    </span>
                                    :
                                    <span className="material-symbols-outlined text-white">
                                      hourglass_empty
                                    </span>
                                }
                              </div>
                              <div>
                                {v.title}
                                <div style={{ fontSize: '10px' }} className='text-muted mt-1'>{v?.date}</div>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className='d-block text-start'>
                            {v.description}
                            <div className='text-end'>
                              <span className="me-2 pointer" onClick={() => onHandleFinishTask(v, index)}>
                                {
                                  v.finished ?
                                    <span className="material-symbols-outlined">
                                      close
                                    </span>
                                    :
                                    <span className="material-symbols-outlined">
                                      done_outline
                                    </span>
                                }
                              </span>
                              <span
                                onClick={() => {
                                  settitle(v.title)
                                  setdescription(v.description)
                                  setactiveTab('new-todo')
                                  settitleButtonRight(("Edit todo"))
                                  setidEdit(index)
                                }}
                                className="material-symbols-outlined pointer me-2">
                                edit
                              </span>
                              <span onClick={() => onHandleDelete(index)} className="material-symbols-outlined pointer">
                                delete
                              </span>
                            </div>
                          </Accordion.Body>
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
          <Tab style={{ color: 'white' }} eventKey="new-todo" title={titleButtonRight}>
            <div style={{ height: '400px' }}>
              <form onSubmit={handleClick}>
                <div className='text-right'>
                  <FormControl required value={title} onChange={(e) => settitle(e.target.value)} className='mb-2' placeholder='Write your task title' />
                  <FormControl required value={description} onChange={(e) => setdescription(e.target.value)} className='mb-3' as='textarea' style={{ height: '290px' }} placeholder='Tell your task description' />
                  <div className='d-flex gap-2'>
                    {
                      titleButtonRight == 'Edit todo' &&
                      <Button onClick={() => {
                        settitleButtonRight('Create new')
                        settitle('')
                        setdescription('')
                      }} variant='light' className='w-100 mb-1'>Cancel</Button>
                    }
                    <Button type="submit" className='w-100 mb-1 btn-primary'>Save todo</Button>
                  </div>
                </div>
              </form>
            </div>
          </Tab>
        </Tabs>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          className='text-start'
          closeButton={false}
          draggable
          pauseOnHover
        />
      </Container>
    </div >
  )
}

export default Home