import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import myFavoriteBooks from './myFavoriteBooks.css'

class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props)
    this.state={
      bookData:[],
      show:false
    }

  }

  
  componentDidMount=async()=>{
    try{
      let email=this.props.auth0.user.email
      let PORT=process.env.REACT_APP_PORT
      let locally='http://localhost:3001'
      let URL=`${locally}/books?email=${email}`
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

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log(user)

    
      return(
        <>      
          
            <Jumbotron>
              <h1>My Favorite Books</h1>
              <p>
                This is a collection of my favorite books
              </p>
            </Jumbotron>
            <div class='books'>

                { this.state.show &&
                  this.state.bookData.map(item=>{
                    return(
                      <>
                      
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={item.img} />
                          {/* <img src={item.img}/> */}
                          <Card.Body>
                            <Card.Title>{item.bookName}</Card.Title>
                            <Card.Text>
                              {item.description}
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
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
