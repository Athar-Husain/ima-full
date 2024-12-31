import React, { useEffect } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Breadcrumb from "../Components/Breadcrumb.jsx";
// import MemberArea from "../Components/MemberArea.jsx";
// import MemberData from "../Components/MemberData.jsx";
import ProfileFormPage from "../../Otp/ProfileFormPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getMemberData } from "../redux/features/auth/memberSlice.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProfileFormPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // const selectedMember = useSelector((state) => state.member.selectedMember);
  // const location = useLocation(); // Use the hook to access route state
  const phoneNumber = location.state?.phoneNumber; // Get phoneNumber from state
  // const id = location.state?.id; // Get phoneNumber from state

  const { memberdata, allMembers, isLoading, isError } = useSelector(
    (state) => state.member
  );

  console.log("id from prarams", id);

  console.log("member Data", memberdata);

  useEffect(() => {
    dispatch(getMemberData(id));
  }, [dispatch]);
  return (
    <>
      <Header />
      <Breadcrumb
        title="Member Details"
        // description="Member can view his details and download his/her certificate"
        // description2="Note: Member can update Mobile No , E-mail & Address"
      />

      <ProfileFormPage />
      <Footer />
    </>
  );
};

export default ProfileFormPages;
