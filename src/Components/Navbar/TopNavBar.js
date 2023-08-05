import React, {Component} from 'react';
import {Icon, Navbar, Nav} from 'rsuite';
import {NavLink} from 'react-router-dom';
import AuthUserContext from '../Session/context';
import { withFirebase } from '../Firebase';

class TopNavBar extends Component {
    render(){
        return(
            <AuthUserContext.Consumer>
                {
                    authUser => {
                        return(
                            <div>
                                <Navbar appearance="inverse">
                                    <Navbar.Header style={{display: "flex", padding: '18px 20px', alignItems: 'center', justifyContent: 'center'}}>
                                        <div>
                                            <Icon icon="book" size="2x" style={{paddingRight: '5px'}}/>
                                            <NavLink to="/" style={{fontSize: '35px', fontWeight: 'bold', textDecoration: 'underline white'}}>STEM LMS</NavLink>
                                        </div>
                                    </Navbar.Header>

                                    <Nav pullRight>
                                        {
                                            authUser? 
                                                (<>
                                                    <Nav.Item>  
                                                        <NavLink to="/dashboard" style={{color:'black', textDecoration: 'none'}}>Dashboard</NavLink>
                                                    </Nav.Item>
                                                    <Nav.Item onSelect={this.props.firebase.doSignOut}>
                                                        Sign out
                                                    </Nav.Item>
                                                </>
                                                )
                                                :
                                                (<>
                                                    <Nav.Item>  
                                                        <NavLink to="/signup" style={{fontSize: '20px', fontWeight: 'bold', color:'black', textDecoration: 'none'}}>Signup</NavLink>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <NavLink to="/login" style={{fontSize: '20px', fontWeight: 'bold', color:'black', textDecoration: 'none'}}>Login</NavLink>
                                                    </Nav.Item>
                                                </>)
                                        }
                                    </Nav>
                                </Navbar>
                            </div>
                        )
                    }
                }
            </AuthUserContext.Consumer>
        )
    }
}

export default withFirebase(TopNavBar);