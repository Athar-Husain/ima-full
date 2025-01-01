// import React, { useEffect, useState } from 'react';
// import {
//   MenuItem,
//   Button,
//   Select,
//   FormControl,
//   InputLabel,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   TextField
// } from '@mui/material';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import MainCard from 'ui-component/cards/MainCard';
// import { styled } from '@mui/material/styles';
// import { tableCellClasses } from '@mui/material/TableCell';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllStateBranches } from '../../../redux/features/state/stateSlice';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14
//   }
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0
//   }
// }));

// const StateViewBranches = () => {
//   const dispatch = useDispatch();
//   const { stateBranches = [], loading, error } = useSelector((state) => state.states);
//   const [filterStateName, setFilterStateName] = useState('');

//   console.log('stateBranches', stateBranches);

//   // Fetch data from the Redux store
//   useEffect(() => {
//     dispatch(getAllStateBranches());
//   }, [dispatch]);

//   const handleFilterChange = (event) => {
//     setFilterStateName(event.target.value);
//   };

//   const handleExportToExcel = () => {
//     const filteredData = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'StateBranches');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     });
//     saveAs(blob, 'StateBranches.xlsx');
//   };

//   const handleExportToPdf = () => {
//     const filteredData = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));
//     const doc = new jsPDF();
//     doc.text('State Branches', 14, 15);
//     autoTable(doc, {
//       head: [['State Name']],
//       body: filteredData.map((branch) => [branch.stateName])
//     });
//     doc.save('StateBranches.pdf');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   // Filter stateBranches based on the selected filterStateName
//   // const filteredBranches = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));

//   const filteredBranches = (Array.isArray(stateBranches) ? stateBranches : []).filter((branch) =>
//     branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase())
//   );
//   return (
//     <MainCard title="View State Branches">
//       <Box component="form" noValidate>
//         <Grid container spacing={2}>
//           {/* Filter by State Name */}
//           <Grid item xs={12} sm={6} md={4}>
//             <TextField label="Search by State Name" variant="outlined" fullWidth value={filterStateName} onChange={handleFilterChange} />
//           </Grid>

//           {/* Export Buttons */}
//           <Grid item xs={6} sm={3} md={2}>
//             <Button
//               variant="contained"
//               size="large"
//               fullWidth
//               onClick={handleExportToExcel}
//               sx={{ backgroundColor: '#697586', '&:hover': { backgroundColor: '#364152' } }}
//             >
//               Export to Excel
//             </Button>
//           </Grid>

//           <Grid item xs={6} sm={3} md={2}>
//             <Button
//               variant="contained"
//               size="large"
//               fullWidth
//               onClick={handleExportToPdf}
//               sx={{ backgroundColor: '#7d4c92', '&:hover': { backgroundColor: '#653b74' } }}
//             >
//               Export to PDF
//             </Button>
//           </Grid>
//         </Grid>

//         {/* State Branches Table */}
//         <TableContainer style={{ marginTop: '20px' }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>State Name</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredBranches.length > 0 ? (
//                 filteredBranches.map((branch, index) => (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell>{branch.stateName}</StyledTableCell>
//                   </StyledTableRow>
//                 ))
//               ) : (
//                 <StyledTableRow>
//                   <StyledTableCell colSpan={1} align="center">
//                     No State Branches Found
//                   </StyledTableCell>
//                 </StyledTableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </MainCard>
//   );
// };

// export default StateViewBranches;

// import React, { useEffect, useState } from 'react';
// import {
//   MenuItem,
//   Button,
//   Select,
//   FormControl,
//   InputLabel,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box
// } from '@mui/material';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import MainCard from 'ui-component/cards/MainCard';
// import { styled } from '@mui/material/styles';
// import { tableCellClasses } from '@mui/material/TableCell';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllStateBranches } from 'redux/features/state/stateSlice';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14
//   }
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0
//   }
// }));

// const StateViewBranches = () => {
//   const dispatch = useDispatch();
//   const { stateBranches, loading, error } = useSelector((state) => state.states);
//   const [filterStateName, setFilterStateName] = useState('');

//   // Fetch data from the Redux store
//   useEffect(() => {
//     dispatch(getAllStateBranches());
//   }, [dispatch]);

//   console.log('state branches', stateBranches);

//   const handleFilterChange = (event) => {
//     setFilterStateName(event.target.value);
//   };

//   const handleExportToExcel = () => {
//     const filteredData = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'StateBranches');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     });
//     saveAs(blob, 'StateBranches.xlsx');
//   };

//   const handleExportToPdf = () => {
//     const filteredData = stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));
//     const doc = new jsPDF();
//     doc.text('State Branches', 14, 15);
//     autoTable(doc, {
//       head: [['State Name']],
//       body: filteredData.map((branch) => [branch.stateName])
//     });
//     doc.save('StateBranches.pdf');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   // Ensure that stateBranches is an array before calling filter
//   const filteredBranches = Array.isArray(stateBranches)
//     ? stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()))
//     : [];

//   console.log('filtered branches', filteredBranches);

//   return (
//     <MainCard title="View State Branches">
//       <Box component="form" noValidate>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4}>
//             {/* <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Search For</InputLabel>
//               <Select value={filterStateName} onChange={handleFilterChange} label="Search For">
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
//                 <MenuItem value="Delhi">Delhi</MenuItem>
//                 <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
//                 <MenuItem value="Karnataka">Karnataka</MenuItem>
//                 <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
//                 <MenuItem value="Assam">Assam</MenuItem>
//               </Select>
//             </FormControl> */}
//           </Grid>

//           <Grid item xs={6} sm={3} md={2}>
//             <Button
//               variant="contained"
//               size="large"
//               fullWidth
//               onClick={handleExportToExcel}
//               sx={{ backgroundColor: '#697586', '&:hover': { backgroundColor: '#364152' } }}
//             >
//               Export to Excel
//             </Button>
//           </Grid>

//           <Grid item xs={6} sm={3} md={2}>
//             <Button
//               variant="contained"
//               size="large"
//               fullWidth
//               onClick={handleExportToPdf}
//               sx={{ backgroundColor: '#7d4c92', '&:hover': { backgroundColor: '#653b74' } }}
//             >
//               Export to PDF
//             </Button>
//           </Grid>
//         </Grid>

//         {/* {filteredBranches.length > 0 && (
//           <TableContainer style={{ marginTop: '20px' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>State Name</StyledTableCell>
//                   <StyledTableCell>State Code</StyledTableCell>
//                   <StyledTableCell>Email</StyledTableCell>
//                   <StyledTableCell>Mobile</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredBranches.map((branch, index) => (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell>{branch.stateName}</StyledTableCell>
//                     <StyledTableCell>{branch.stateCode}</StyledTableCell>
//                     <StyledTableCell>{branch.email}</StyledTableCell>
//                     <StyledTableCell>{branch.contact.mobile}</StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )} */}
//         {stateBranches.length > 0 && (
//           <TableContainer style={{ marginTop: '20px' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>State Name</StyledTableCell>
//                   <StyledTableCell>State Code</StyledTableCell>
//                   <StyledTableCell>Email</StyledTableCell>
//                   <StyledTableCell>Mobile</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {stateBranches.map((branch, index) => (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell>{branch.stateName}</StyledTableCell>
//                     <StyledTableCell>{branch.stateCode}</StyledTableCell>
//                     <StyledTableCell>{branch.email}</StyledTableCell>
//                     <StyledTableCell>{branch.contact.mobile}</StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>
//     </MainCard>
//   );
// };

// export default StateViewBranches;

import React, { useEffect, useState } from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStateBranches } from 'redux/features/state/stateSlice';

// Styled components for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const StateViewBranches = () => {
  const dispatch = useDispatch();
  const { stateBranches = [], loading, error } = useSelector((state) => state.states);
  const [filterStateName, setFilterStateName] = useState('');

  // Fetch data from the Redux store
  useEffect(() => {
    dispatch(getAllStateBranches());
  }, [dispatch]);

  // Handle filter input change
  const handleFilterChange = (event) => {
    setFilterStateName(event.target.value);
  };

  // Filter data function
  const filterBranches = () => {
    return stateBranches.filter((branch) => branch.stateName?.toLowerCase().includes(filterStateName.toLowerCase()));
  };

  // Export to Excel
  const handleExportToExcel = () => {
    const filteredData = filterBranches();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StateBranches');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'StateBranches.xlsx');
  };

  // Export to PDF
  const handleExportToPdf = () => {
    const filteredData = filterBranches();
    const doc = new jsPDF();
    doc.text('State Branches', 14, 15);
    autoTable(doc, {
      head: [['State Name']],
      body: filteredData.map((branch) => [branch.stateName])
    });
    doc.save('StateBranches.pdf');
  };

  // Loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Filtered branches for display
  const filteredBranches = filterBranches();

  return (
    <MainCard title="View State Branches">
      <Box component="form" noValidate>
        <Grid container spacing={2}>
          {/* Search and Export Buttons */}
          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleExportToExcel}
              sx={{ backgroundColor: '#697586', '&:hover': { backgroundColor: '#364152' } }}
            >
              Export to Excel
            </Button>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleExportToPdf}
              sx={{ backgroundColor: '#7d4c92', '&:hover': { backgroundColor: '#653b74' } }}
            >
              Export to PDF
            </Button>
          </Grid>
        </Grid>

        {/* State Branches Table */}
        {filteredBranches.length > 0 ? (
          <TableContainer style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>State Name</StyledTableCell>
                  <StyledTableCell>State Code</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Mobile</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBranches.map((branch, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{branch.stateName}</StyledTableCell>
                    <StyledTableCell>{branch.stateCode}</StyledTableCell>
                    <StyledTableCell>{branch.email}</StyledTableCell>
                    <StyledTableCell>{branch.contact.mobile}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>No State Branches Found</div>
        )}
      </Box>
    </MainCard>
  );
};

export default StateViewBranches;
