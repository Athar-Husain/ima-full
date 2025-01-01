import PureCounter from "@srexi/purecounterjs"; // Default export
import React, { useEffect, useState } from "react";
import { getAllMembers } from "../redux/features/auth/memberSlice";
import { useDispatch, useSelector } from "react-redux";

const CountSection = () => {
  const dispatch = useDispatch();

  const { totalMembers, allMembers, isLoading, isError } = useSelector(
    (state) => state.member
  );

  // const [usersCount, setUsersCount] = useState(0);

  // useEffect(() => {
  //   if (!isLoading && !isError && allMembers) {
  //     setUsersCount(allMembers.length);
  //   }
  // }, [isLoading, isError, allMembers]);

  // useEffect(() => {
  //   // Initialize PureCounter when component mounts
  //   const purecounter = new PureCounter();
  // }, []);

  // let UsersCount = allMembers.length();

  // console.log("user count in home page", usersCount);

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  useEffect(() => {
    // Initialize PureCounter when component mounts
    new PureCounter();
  }, []);

  // Dependency array ensures it runs only once

  return (
    <>
      {/* Counts Section */}
      <section id="counts" className="section counts light-background">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start={0}
                  data-purecounter-end={totalMembers}
                  data-purecounter-duration={1}
                  className="purecounter"
                />
                <p>Members</p>
              </div>
            </div>
            {/* End Stats Item */}
            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start={0}
                  data-purecounter-end={29}
                  data-purecounter-duration={1}
                  className="purecounter"
                />
                <p>States</p>
              </div>
            </div>
            {/* End Stats Item */}
            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start={0}
                  data-purecounter-end={42}
                  data-purecounter-duration={1}
                  className="purecounter"
                />
                <p>Branches</p>
              </div>
            </div>
            {/* End Stats Item */}
            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start={0}
                  data-purecounter-end={24}
                  data-purecounter-duration={1}
                  className="purecounter"
                />
                <p>Trainers</p>
              </div>
            </div>
            {/* End Stats Item */}
          </div>
        </div>
      </section>
      {/* /Counts Section */}
    </>
  );
};

export default CountSection;
