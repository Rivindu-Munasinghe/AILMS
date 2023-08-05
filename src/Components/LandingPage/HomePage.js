import React, {Component} from 'react';
import TopNavBar from '../Navbar/TopNavBar';
import { Container, Button } from 'rsuite';
import headerImg from '../../assets/head.png'
import CourseShowcase from '../Courses/CourseShowcase';
import withCourse from '../Courses/Context/withCourse';
import { NavLink } from 'react-router-dom';
class HomePage extends Component {
    render(){
		const coursesList = this.props.coursesList;

		return(
			<div>
			<TopNavBar/>
				<Container style= {{ flex: 1, flexDirection: 'row', backgroundColor: '#3598ff', minHeight: '500px'}}>
					<Container style={{margin: '100px', color: 'white'}}>
						<h1 style={{lineHeight: '80px', marginBottom: '15px'}}>The LMS for <br/>STEM Education</h1>
						<p style={{color:'black', fontWeight: 'bold'}}>STEM education is a teaching approach that combines Science, Technology, Engineering and Mathematics.</p>
						<Button style={{marginTop: '20px', width: '150px'}}><NavLink to='/courses' style={{textDecoration: 'none', color:'#575757'}}>Get Started</NavLink></Button>
					</Container>
					<Container style={{margin: '80px', color: 'white'}}>
						<img src={headerImg} style={{width: '350px', height: '250'}} alt=''></img>
					</Container>
				</Container>

				<Container style = {{margin: '50px', flexDirection: 'column'}}>
					<Container>
						<h3>Recently Added</h3>
					</Container>
					
					<Container style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
						{
							coursesList && coursesList.length?
								Array.from(coursesList).reverse().map((course, i) => {
									if(i < 4){
										return (
											<CourseShowcase course={course}/>
										)
									}else{
										return null;
									}
								})	
							:null
						}
					</Container>
				</Container>
			</div>
		)
	}
  }
  
  export default withCourse(HomePage);
  
