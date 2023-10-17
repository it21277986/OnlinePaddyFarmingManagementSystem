import "./assetsOfficer/css/argon-dashboard-react.min.css";
import "./assetsOfficer/css/argon-dashboard-react.css.map";
import "./assetsOfficer/css/footer.css"
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const DashBoardFooter = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
           
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href=""

              >
                About Us
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default DashBoardFooter;
