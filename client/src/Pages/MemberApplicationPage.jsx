import React from 'react';
import Header from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Breadcrumb from '../Components/Breadcrumb.jsx';

import MemberApplication from '../Components/MemberApplication.jsx';


const MemberApplicationPage = () => {
  return (
    <>
    <Header/>
    <Breadcrumb 
        title="Member Application Form" 
        description="Member can apply online application form from here."     />   

      <MemberApplication/>
      <Footer/>
      
    </>
  );
};
 
export default MemberApplicationPage;
