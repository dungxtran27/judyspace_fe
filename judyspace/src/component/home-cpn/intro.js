import { Container, Row } from "react-bootstrap";
import "../../css/home.css";

const Intro = () => {
  return (
    <div className="bg-intro">
      <Container>
        <Row className="intro">
          <div className="para">
            <img className="chibi" src="/intro.jpg" alt="" />

            <div className="text">
              <p className="head">Judy muahaha</p>
              <p className="bodytext">
                dfgd ádas ád ád ád ádas fgr grt hrt hrt sfgs dfg sdfg sdfg sdfg
                sdf gsdf gsdf gsdf g
              </p>
            </div>
          </div>
          <div className="para">
            <div className="text">
              <p className="head">Judy muahaha</p>
              <p className="bodytext">
                dfgd ádas ád ád ád ádas fgr grt hrt hrt sfgs dfg sdfg sdfg sdfg
                sdf gsdf gsdf gsdf g
              </p>
            </div>
            <img className="chibi" src="/intro1.jpg" alt="" />
          </div>
          <div className="para">
            <img className="chibi" src="/intro2.jpg" alt="" />
            <div className="text">
              <p className="head">Judy muahaha</p>
              <p className="bodytext">
                dfgd ádas ád ád ád ádas fgr grt hrt hrt sfgs dfg sdfg sdfg sdfg
                sdf gsdf gsdf gsdf g
              </p>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
