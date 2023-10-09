import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {

  let API_URL = "http://localhost:3001/"

  const [countries, setCountries] = React.useState<any[]>([]);
  const [country, setCountry] = React.useState('');

  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [nameErrorText, setNameErrorText] = React.useState("");
  const [ageErrorText, setAgeErrorText] = React.useState("");
  const [dialogErrorText, setDialogErrorText] = React.useState("");

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=> {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(json => setCountries(json))
      .catch(error => console.error('There was a problem with the fetch:', error));
  })

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let sex = data.get('sex');

    if (!name) {
      setNameErrorText("Please enter your name");
      return
    } else {
      setNameErrorText("");
    }
    if (!age) {
      setAgeErrorText("Please enter your age");
      return
    } else {
      setAgeErrorText("");
    }

    if(!sex) {
      setDialogErrorText("Select gender");
      handleClickOpen();
      return
    }

    if(!country) {
      setDialogErrorText("select country");
      handleClickOpen();
      return
    }

    fetch(API_URL+"api/adduser", {method: "POST",body: data})
      .then(res=>res.json())
      .then((result)=> {
        navigate('/success', { state: { name: name } })
      })
      .catch(error => console.error('There was a problem with the application:', error));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormControl>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  value={name}
                  error={!!nameErrorText}
                  helperText={nameErrorText}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="sex">Gender*</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-buttons-group-label"
                  name="sex"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </Grid>          
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  id="age"
                  value={age}
                  error={!!ageErrorText}
                  helperText={ageErrorText}
                  onChange={e => setAge(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="country-select-input-label">Country*</FormLabel>
                <Select
                  labelId="country"
                  id="country"
                  value={country}
                  label="Country"
                  onChange={handleCountryChange}
                  fullWidth
                >
                  {countries.map((country) => (
                    <MenuItem
                      key={country.name.cca2}
                      value={country.name.common}
                    >
                      {country.name.common}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Apply
            </Button>
          </Box>
        </Box>
        </FormControl>
        <div>
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
            {"Missing required field!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogErrorText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
          </Dialog>
        </div>
      </Container>
    </ThemeProvider>
  );
}