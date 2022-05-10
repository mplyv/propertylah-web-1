import { useSearchParams } from "react-router-dom";

// mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const tiers = [
  {
    title: "Huat a bit",
    price: "100",
    description: ["100 posting credits", "Email support"],
    buttonText: "BUY NOW",
    buttonVariant: "outlined",
  },
  {
    title: "Huat ah!",
    subheader: "Most popular",
    price: "200",
    description: [
      "200 posting credits",
      "30% bonus credits!",
      "Priority email support",
    ],
    buttonText: "BUY NOW",
    buttonVariant: "contained",
  },
  {
    title: "Super Huat!",
    price: "500",
    description: [
      "500 posting credits",
      "40% bonus credits!",
      "Phone & email support",
    ],
    buttonText: "BUY NOW",
    buttonVariant: "outlined",
  },
];

const Credits = () => {
  const [searchParams] = useSearchParams();
  const payment = searchParams.get("payment");

  return (
    <>
      <GlobalStyles
        styles={{ ul: { marginBottom: 0, padding: 0, listStyle: "none" } }}
      />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>Stripes does not support React 18 yet.
          All payment processing is currently not PCI compliant and for
          demonstration purpose only.
        </Alert>

        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Purchase Credits
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Buy credits to boost your sales!
        </Typography>
        {payment === "failure" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something went wrong. Please contact our helpdesk or try again
            later.
          </Alert>
        )}
        {payment === "success" && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Thank you for purchase! Huat ah!
          </Alert>
        )}
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" sx={{ marginBottom: 20 }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <form
                    action="http://68.183.183.118:4088/api/v1/orders/checkout-session/2"
                    method="POST"
                  >
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      type="submit"
                    >
                      {tier.buttonText}
                    </Button>
                  </form>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Credits;
