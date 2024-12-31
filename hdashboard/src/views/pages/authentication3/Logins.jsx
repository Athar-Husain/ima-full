import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthFooter from 'ui-component/cards/AuthFooter';
import logo from "../../../assets/images/ima-ams-logo.jpg";

// ================================|| AUTH3 - LOGIN ||================================ //

const Logins = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const cardDetails = [
    {
      title: "IMA-AMS Headquarters Login",
      description: "Welcome to admin portal of IMA-AMS Headquarters.",
      buttonText: "Login",
      link: "/dashboard1",
    },
    {
      title: "IMA-AMS State Login",
      description: "Welcome to admin portal of IMA-AMS State offices.",
      buttonText: "Login",
      link: "/dashboard2",
    },
    {
      title: "IMA-AMS Branch Login",
      description: "Welcome to admin portal of IMA-AMS Branch offices.",
      buttonText: "Login",
      link: "/dashboard3",
    },
  ];

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item xs={12} container sx={{ ml: 3, mr: 3 }}>
              {cardDetails.map((card, index) => (
                <Grid item xs={12} sm={4} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' ,                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',                     borderRadius: '8px',     


                }}>
                  <AuthCardWrapper>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                      <Grid item sx={{ mb: 0 }}>
                        <Link to="#" aria-label="logo">
                          <img src={logo} alt="" style={{ width: '200px', height: '200px',textAlign:'center' }} />
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            {card.title}
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                            {card.description}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          size="large"
                          type="button"
                          variant="contained"
                          color="secondary"
                          component={Link}
                          to={card.link}
                        >
                          {card.buttonText}
                        </Button>
                      </Grid>
                    </Grid>
                  </AuthCardWrapper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Logins;
