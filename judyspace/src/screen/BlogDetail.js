import DefaultTemplate from "../template/DefaultTemplate";
import "../css/BlogDetail.css";
import { Image, Row } from "react-bootstrap";
import Comment from "../component/Comment";
const BlogDetail = () => {
  return (
    <DefaultTemplate>
      <div className="blogDetailBackGround">
        <Row className="Judy">
          <Image
            className="JudyAvatar"
            roundedCircle
            src={
              "https://i.ibb.co/Fqrdy5x/product-image-1593207438.jpg?fbclid=IwAR3En0nVj9k2_S9BWCszBJKd-g-3lsKw4gY-OKjAaEZbD24eBd4u35Z9DMY"
            }
          />
          <div className="JudyText">
            <p>Judy the marketer</p>
            <p className="postdate">Friday Nov 13 2023</p>
          </div>
        </Row>
        <Row className="blogTitle">
          <h5 style={{color: "#D6b598"}}>
            How to not shoot your self in the head when working with reactJS
          </h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque semper lectus vel tortor malesuada laoreet. Donec vitae
            ligula eget urna blandit convallis nec sit amet sapien. Sed sed nisl
            dolor. Quisque sed velit ut elit mattis consectetur. Ut sit amet
            felis sit amet dolor tristique commodo. Ut vitae vehicula eros.
            Pellentesque rhoncus ornare viverra. Sed sed nisl ornare, ultricies
            magna vitae, gravida orci. Curabitur ut odio mi. Aliquam ut risus
            faucibus, efficitur neque a, tincidunt lectus. Nulla laoreet gravida
            dolor, nec ornare nisi tincidunt tincidunt. Nam ullamcorper ligula
            at mi consequat lacinia. Morbi facilisis, erat in pulvinar posuere,
            dolor nunc auctor felis, vel dignissim dui nunc non dui.
          </p>
        </Row>
        <Row className="ImageGallery" style={{ textAlign: "center" }}>
          <div
            className="col-lg-8"
            style={{ display: "flex", alignItems: "top", margin: "0 auto" }}
          >
            <Image
              style={{ width: "300px" }}
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=242&h=242&fit=crop&auto=format"
            ></Image>
            <div style={{ display: "inline-block" }}>
              <Image
                style={{ width: "150px" }}
                src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=121&h=121&fit=crop&auto=format"
              ></Image>
              <Image
                style={{ width: "150px" }}
                src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=121&h=121&fit=crop&auto=format"
              ></Image>
              <Image
                style={{ display: "block", width: "300px" }}
                src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=242&h=121&fit=crop&auto=format"
              ></Image>
            </div>
          </div>
        </Row>
        <Row className="blogTitle">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque semper lectus vel tortor malesuada laoreet. Donec vitae
            ligula eget urna blandit convallis nec sit amet sapien. Sed sed nisl
            dolor. Quisque sed velit ut elit mattis consectetur. Ut sit amet
            felis sit amet dolor tristique commodo. Ut vitae vehicula eros.
            Pellentesque rhoncus ornare viverra. Sed sed nisl ornare, ultricies
            magna vitae, gravida orci. Curabitur ut odio mi. Aliquam ut risus
            faucibus, efficitur neque a, tincidunt lectus. Nulla laoreet gravida
            dolor, nec ornare nisi tincidunt tincidunt. Nam ullamcorper ligula
            at mi consequat lacinia. Morbi facilisis, erat in pulvinar posuere,
            dolor nunc auctor felis, vel dignissim dui nunc non dui. Fusce
            malesuada congue sapien id maximus. In aliquam, neque sed iaculis
            vestibulum, nunc velit convallis augue, non tempus erat orci id dui.
            Nunc a erat eu quam accumsan porta. Ut sodales erat ac nisi
            vestibulum hendrerit. Proin fermentum massa eu rhoncus lacinia.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Aliquam congue convallis odio, a accumsan est ultrices non. Integer
            laoreet malesuada sodales. Vestibulum eros sem, volutpat eget
            ultricies non, volutpat at tortor. Integer fermentum libero odio, ut
            vehicula justo iaculis a. Maecenas fermentum tempus ornare. Aenean
            tincidunt neque massa. Fusce quis blandit purus, eu iaculis risus.
            Nullam massa risus, tincidunt ut vulputate a, interdum eget ipsum.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </Row>
        <Row className="ImageGallery" style={{ textAlign: "center" }}>
          <div
            className="col-lg-8"
            style={{ display: "flex", alignItems: "top", margin: "0 auto" }}
          >
            <Image
              style={{ width: "300px" }}
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=242&h=242&fit=crop&auto=format"
            ></Image>
            <div style={{ display: "inline-block" }}>
              <Image
                style={{ width: "150px" }}
                src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=121&h=121&fit=crop&auto=format"
              ></Image>
              <Image
                style={{ width: "150px" }}
                src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=121&h=121&fit=crop&auto=format"
              ></Image>
              <Image
                style={{ display: "block", width: "300px" }}
                src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=242&h=121&fit=crop&auto=format"
              ></Image>
            </div>
          </div>
        </Row>
        <Row className="blogTitle">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque semper lectus vel tortor malesuada laoreet. Donec vitae
            ligula eget urna blandit convallis nec sit amet sapien. Sed sed nisl
            dolor. Quisque sed velit ut elit mattis consectetur. Ut sit amet
            felis sit amet dolor tristique commodo. Ut vitae vehicula eros.
            Pellentesque rhoncus ornare viverra. Sed sed nisl ornare, ultricies
            magna vitae, gravida orci. Curabitur ut odio mi. Aliquam ut risus
            faucibus, efficitur neque a, tincidunt lectus. Nulla laoreet gravida
            dolor, nec ornare nisi tincidunt tincidunt. Nam ullamcorper ligula
            at mi consequat lacinia. Morbi facilisis, erat in pulvinar posuere,
            dolor nunc auctor felis, vel dignissim dui nunc non dui. Fusce
            malesuada congue sapien id maximus. In aliquam, neque sed iaculis
            vestibulum, nunc velit convallis augue, non tempus erat orci id dui.
            Nunc a erat eu quam accumsan porta. Ut sodales erat ac nisi
            vestibulum hendrerit. Proin fermentum massa eu rhoncus lacinia.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Aliquam congue convallis odio, a accumsan est ultrices non. Integer
            laoreet malesuada sodales. Vestibulum eros sem, volutpat eget
            ultricies non, volutpat at tortor. Integer fermentum libero odio, ut
            vehicula justo iaculis a. Maecenas fermentum tempus ornare. Aenean
            tincidunt neque massa. Fusce quis blandit purus, eu iaculis risus.
            Nullam massa risus, tincidunt ut vulputate a, interdum eget ipsum.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Integer efficitur euismod orci, quis rhoncus augue dignissim eget.
            Nullam ac blandit lorem. Ut ut ultricies velit, nec convallis eros.
            Nam eu malesuada enim. Sed eleifend interdum arcu, a mollis lectus
            vulputate eu. Nullam erat ligula, fringilla sit amet pretium a,
            placerat vitae ante. Vivamus nunc dui, iaculis a nulla interdum,
            dignissim maximus lectus. Sed facilisis molestie ex, id consequat
            libero condimentum vitae. Nulla bibendum vestibulum nisl in
            facilisis. Integer at mollis leo. Pellentesque risus ex, dignissim
            at pharetra vel, venenatis ac diam. Maecenas efficitur dui quis eros
            imperdiet porttitor. Duis ut faucibus tortor, et viverra odio. Sed
            dictum diam lectus, et porttitor urna pulvinar ut. Donec convallis
            efficitur ante, vitae scelerisque arcu laoreet ut. Nulla facilisi.
            Nullam nisl eros, rutrum eget enim sit amet, blandit sollicitudin
            risus. freestar Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Pellentesque semper lectus vel tortor malesuada laoreet. Donec
            vitae ligula eget urna blandit convallis nec sit amet sapien. Sed
            sed nisl dolor. Quisque sed velit ut elit mattis consectetur. Ut sit
            amet felis sit amet dolor tristique commodo. Ut vitae vehicula eros.
            Pellentesque rhoncus ornare viverra. Sed sed nisl ornare, ultricies
            magna vitae, gravida orci. Curabitur ut odio mi. Aliquam ut risus
            faucibus, efficitur neque a, tincidunt lectus. Nulla laoreet gravida
            dolor, nec ornare nisi tincidunt tincidunt. Nam ullamcorper ligula
            at mi consequat lacinia. Morbi facilisis, erat in pulvinar posuere,
            dolor nunc auctor felis, vel dignissim dui nunc non dui.
          </p>
        </Row>
        <Row>
          <h3 style={{color: "white"}}>Comment</h3>
          <Comment type={"Root"} parameter={1} />
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default BlogDetail;
