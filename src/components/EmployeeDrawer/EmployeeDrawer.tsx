import React, {useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  TextField, Tooltip,
  Typography
} from "@mui/material";
import {useEmployeeTableStore} from "../../hooks/employeeTable/useEmployeeTableStore";
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmployeeDrawer = () => {
  const [expandDetails, setExpandDetails] = useState(true);
  const {selectedEmployee, setSelectedEmployee} = useEmployeeTableStore();

  return (
    <Drawer open={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} anchor={"right"}>
      <Box width={440}>
        <Box padding={2} gap={1} display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography variant={"h5"} fontFamily={"Lato"} fontWeight={600}>{selectedEmployee?.fullName}</Typography>
            <Tooltip title={"Close"}>
              <Box onClick={() => setSelectedEmployee(null)} sx={{cursor: "pointer"}}>
                <CloseIcon />
              </Box>
            </Tooltip>
          </Box>
          {
            selectedEmployee?.trackingStatus === 'Active' && (
            <Box bgcolor={"#C4E0B1"} borderRadius={"4px"} border={"1px solid #E2E8F0"} display={"flex"} gap={2} paddingY={1} paddingX={2}>
              <PersonIcon color={"success"}/>
              <Typography fontFamily={"Lato"} variant={"body2"} color={"#105E1D"}>Included - Active</Typography>
            </Box>
          )}
        </Box>
        <Divider />
        <Accordion disableGutters expanded={expandDetails} onChange={(e, expanded) => setExpandDetails(expanded)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={"h6"} fontFamily={"Lato"} fontWeight={600}>Profile Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display={"flex"} flexDirection={"column"} gap={4}>
              <Box>
                <Typography color={"#3E4661"} fontSize={"16px"} variant={"caption"} fontFamily={"Lato"} fontWeight={600}>UID</Typography>
                <TextField variant={"outlined"} value={selectedEmployee?.uid} fullWidth style={{fontFamily: "Lato"}} />
              </Box>
              <Box>
                <Typography color={"#3E4661"} fontSize={"16px"} variant={"caption"} fontFamily={"Lato"} fontWeight={600}>Name</Typography>
                <TextField variant={"outlined"} value={selectedEmployee?.fullName} fullWidth style={{fontFamily: "Lato"}} />
              </Box>
              <Box>
                <Typography color={"#3E4661"} fontSize={"16px"} variant={"caption"} fontFamily={"Lato"} fontWeight={600}>Email</Typography>
                <TextField variant={"outlined"} value={selectedEmployee?.primaryEmail} fullWidth style={{fontFamily: "Lato"}} />
              </Box>
            </Box>

          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
};

export default EmployeeDrawer;