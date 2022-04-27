import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <h2>PropertyLah Inc.</h2>
      <div className={classes["footer-info"]}>
        <div>
          <h3>Company Info</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque scelerisque sollicitudin hendrerit. Duis ante neque,
            condimentum at condimentum vitae, pharetra eget ex. Vivamus luctus
            lacus eu nunc rhoncus pharetra. Quisque interdum facilisis
          </p>
        </div>

        <div>
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque scelerisque sollicitudin hendrerit. Duis ante neque,
            condimentum at condimentum vitae, pharetra eget ex. Vivamus luctus
            lacus eu nunc rhoncus pharetra. Quisque interdum facilisis
            venenatis. Sed consectetur augue eu nunc tincidunt mollis. Nam
          </p>
        </div>
        <div>
          <h3>Social Media Links</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
