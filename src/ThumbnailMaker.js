import {useState , useRef} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ThumbnailMaker.css';
import html2canvas from 'html2canvas';

const ThumbnailMaker = () => {

    const [backgroundImage, setBackgroundImage] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const [title, setTitle] = useState('제목을 입력하세요');
    const [content, setContent] = useState('내용을 입력하세요');

    const previewRef = useRef(null);
    
    //url 통해서 프리뷰 변경하기
    const handleImageBackground = () => {
        const regex =
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        
        let imgUrl = prompt('이미지 주소를 입력하세요 😇');
        if (imgUrl === null) return;

        if (!imgUrl.match(regex)) {
        alert('올바르지 않은 URL입니다 😨');
        return;
        }

        setBackgroundImage(imgUrl);
    };
    //inputFields 받은 값을 통해서 components 값 수정하기 
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };
    
    const handleSubtitleChange = (e) => {
        setContent(e.target.value);
    };


    

    // RGB 값 랜덤으로 주기  
    const randomRGB = () => {
        let rgb = '';
        rgb += (Math.floor(Math.random() * 90 + 1) + 150)
            .toString(16)
            .padStart(2, '0');
        rgb += (Math.floor(Math.random() * 90 + 1) + 150)
            .toString(16)
            .padStart(2, '0');
        rgb += (Math.floor(Math.random() * 90 + 1) + 150)
            .toString(16)
            .padStart(2, '0');
        return '#' + rgb;
    };

    
    //클릭하면 랜덤RGB로 변경 
    const handleRandomColorClick = () => {
        const randomColor = randomRGB();
        setBackgroundColor(randomColor);
      };

    
    //리셋하기 
    const handleReset = () => {
        setBackgroundImage('');
        setBackgroundColor('');
        setTitle('제목을 입력하세요');
        setContent('내용을 입력하세요');
    };

    const handleExport = () => {
        if (previewRef.current) {
            html2canvas(previewRef.current, {
              logging: true,
              letterRendering: 1,
              allowTaint: true,
              useCORS: true,
            }).then((canvas) => {

                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'thumbnail.png';
                link.href = imgData;
                link.click();
            });
          }
      };

       


  return (
    <div>
      <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="style.css" />
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="img/favicon.ico" type="image/x-icon" />
        
      <Container fluid className="wrapper">
        <Row className="contents">
          <Col>
            <header>
              <h1>Thumbnail Maker</h1>
            </header>
            {/* ref를 통해서 DOM 접근할수 있다.  */}
            <div id="capture" className="preview" ref={previewRef} 
            style={{ 
                backgroundImage: `url('${backgroundImage}')`,
                backgroundColor: backgroundColor,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
              <ul className="components" id="comp__opt1">
                <li className="render title" >{title}</li>
                <li className="render subtitle">{content}</li>
              </ul>
            </div>
            <div className="control__panel">
              <div className="inputFields horizontal">
                <Form.Group controlId="title">
                <Form.Control
                    type="text"
                    placeholder={ '제목을 입력하세요' }
                    
                    onChange={handleTitleChange}
                />
                </Form.Group>
                <Form.Group controlId="subtitle">
                  <Form.Control type="text" placeholder="내용을 입력하세요" onChange={handleSubtitleChange}/>
                </Form.Group>
                 
              </div>
              <div className="background__btns">
                
                <div id="background__btn__container" className="btns">
                  
                  <Button variant="primary" className="random__solid" onClick={handleRandomColorClick}>
                    랜덤 단색
                  </Button>
                  <Button variant="primary" className="img__url" onClick={handleImageBackground}>
                    이미지 URL
                  </Button>
                </div>
              </div>
              <div className="components__btns">
                <div id="component__btn__container" className="btns">
                   
                  <Button data-set="comp__opt2" className="btn component__opt">
                    제목 / 내용
                  </Button>
                  <Button data-set="comp__opt3" className="btn component__opt">
                    제목만
                  </Button>
                </div>
              </div>
              <div className="master__panel">
                <Button variant="primary" id="initialize" onClick={handleReset}>
                  초기화
                </Button>
                <Button variant="primary" id="export" onClick={handleExport}>
                  완료 및 이미지화
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <section className="mod capture_modal hidden"></section>
      <div className="mod overlay hidden"></div>
    </div>
  );
};

export default ThumbnailMaker;
