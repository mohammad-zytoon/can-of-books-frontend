import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import myFavoriteBooks from './myFavoriteBooks.css';
import BookFormModal from './components/BookFormModal.js';
import UpdateBookForm from './components/UpdateBookForm.js'

class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props)
    this.state={
      bookData:[],
      show:false,
      showAddModel:false,
      imageURL:'',
      bookName:'',
      description:'',
      updateFormShow:false,
      index:0,
      valuesBeforeUpdateArray:[],

    }

  }

  
  componentDidMount=async()=>{
    try{
      let email=this.props.auth0.user.email
      let PORT=process.env.REACT_APP_PORT
      let locally='http://localhost:3001'
      let URL=`${PORT}/books?email=${email}`
      let data= await axios.get(URL);
      if (data.data.length>0){
        this.setState({
          bookData:data.data,
          show:true
        })  
      }
    }catch{
      this.setState({
        show:false
      })
    }
  }
  // lab 013 functions forms+add Data to dataBase 
  // present the form 
  addform=e=>{
    e.preventDefault();

    this.setState({
      showAddModel:true,
    })
    console.log('showAddModel',this.state.showAddModel)

  }
  // send to Backend to add the new data 
  addToDataBase=async(event)=>{
    event.preventDefault();
    let email=this.props.auth0.user.email
    let PORT=process.env.REACT_APP_PORT
    let locally='http://localhost:3001'
    let URL=`${PORT}/addBook`

    const formData={
      email:this.props.auth0.user.email,
      imageURL:this.state.imageURL,
      bookName:this.state.bookName,
      description:this.state.description,
    }
console.log(formData);
    let x = await axios.post(URL,formData);
    console.log(x)
    this.setState({
      bookData:x.data,
      show:true,
      showAddModel:false,
    })

  }

  hideModal=()=>{
    this.setState({showAddModel: false})

  }

  // onchange 
  ImageURL=e=>{
    e.preventDefault();
    let imageURLTarget=e.target.value
    this.setState({
      imageURL:imageURLTarget

    })
    console.log(this.state.imageURL)
  }
  Description=e=>{
    e.preventDefault();
    let descriptionTarget=e.target.value
    this.setState({
      description:descriptionTarget

    })

  }

  BookName=e=>{
    e.preventDefault();
    this.setState({
      bookName:e.target.value

    })
    console.log(this.state.bookName)

  }

  // lab 013 delete REST
  remove=async (index)=>{
    let email=this.props.auth0.user.email
    let PORT=process.env.REACT_APP_PORT
    let locally='http://localhost:3001'
    let URL=`${PORT}/deleteBook`
    const details = {
      email:this.props.auth0.user.email,
      index:index
    }

    console.log(index)
    
    let x= await axios.delete(URL,{params:details})
    console.log('delete',x.data)
    this.setState({
      bookData:x.data
    })
      
  }
  // lab 14 create the update button 
  update=(idx)=>{
    const valuesBeforeUpdate= this.state.bookData.filter((i,index)=> idx==index);
    this.setState({
      updateFormShow:true,
      valuesBeforeUpdateArray:valuesBeforeUpdate,
      index:idx
    })
       

  }

  updateOnDataBase=async e=>{
    e.preventDefault();

    let PORT=process.env.REACT_APP_PORT;
    let locally='http://localhost:3001';
    let index=this.state.index;
    let URL=`${PORT}/updateBook/${index}`;
    const details = {
      email:this.props.auth0.user.email,
      imageURL:this.state.imageURL,
      bookName:this.state.bookName,
      description:this.state.description,

    }
    console.log(index);
    console.log(details)
    
    let mongoData= await axios.put(URL,details);
    // const bookDataAfterUpdate=this.state.bookData.splice(this.state.index,1,mongoData.data)
    this.setState({
      bookData:mongoData.data,
      updateFormShow:false,


    })

  }

  
  render() {
    const { user, isAuthenticated } = this.props.auth0;    
      return(
        <>      
          
            <Jumbotron>
              <h1>My Favorite Books</h1>
              <p>
                This is a collection of my favorite books
              </p>
            </Jumbotron>

            <Button onClick={this.addform}> ADD BOOK </Button>
            <BookFormModal showAddModel={this.state.showAddModel} bookName={this.BookName} Description={this.Description} ImageURL={this.ImageURL} addToDataBase={this.addToDataBase} hideModal={this.hideModal}/>

            <UpdateBookForm updateFormShow={this.state.updateFormShow} bookName={this.BookName} Description={this.Description} ImageURL={this.ImageURL} updateOnDataBase={this.updateOnDataBase} valueDatas={this.state.valuesBeforeUpdateArray} hideModal={this.hideModal}/>

            <div class='books'>

                { this.state.show &&
                  this.state.bookData.map((item,idx)=>{
                    return(
                      <>
                      
                        <Card style={{ width: '18rem' }} key={this.idx}>
                          <Card.Img variant="top" src={item.img} />
                          {/* <img src={item.img}/> */}
                          <Card.Body>
                            <Card.Title>{item.bookName}</Card.Title>
                            <Card.Text>
                              {item.description}
                            </Card.Text>
                            <Button variant="primary" onClick={()=> this.remove(idx)}>DELETE</Button>
                            <Button variant="primary" onClick={()=> this.update(idx)}>UPDATE</Button>
                          </Card.Body>
                        </Card>          

                      </>



                    )


                  })
                }
            </div>    

        
        </>
      )
    
  }
}

export default withAuth0(MyFavoriteBooks);




