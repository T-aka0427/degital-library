import React from 'react'
import { Link } from 'react-router-dom';

import Grid from "@mui/material/Grid";
import { Container } from '@mui/material';

import { useGetBooks } from '../../../hooks/useGetBooks'
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';



const Top = () => {
	const images = useGetBooks();

	const imageCard = images.map((i) => (
		<Grid item md={3} xs={6} key={i.isbn} sx={{mt: 2.5, mb:2.5}}>
			<Link to={`/show/${i.isbn}`} style={{textDecoration: "none"}}>
				<img src={i.imageLink} style={{boxShadow: "0 0 5px gray",}}/>
			</Link>
		</Grid>
	))

  return (
		<Container maxWidth="lg">
			<Header />
			<Container 
				maxWidth="md"
			>
				<Grid container sx={{textAlign: "center"}}>
					{imageCard}
				</Grid>
			</Container>
			<Footer />
		</Container>
  )
}

export default Top