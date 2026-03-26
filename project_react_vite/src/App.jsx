import Header from "./components/Header";
import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";
import TextArea from "./components/TextArea";

function App() {

  return (
    <div className="container">
      <h1 className="title">공통 컴포넌트 테스트</h1>

      <div className="spacing">
        <Input placeholder="텍스트 입력" />
      </div>

      <div className="spacing">
        <Input type="number" placeholder="숫자 입력" />
      </div>

      <div className="spacing">
        <TextArea placeholder="내용 입력" />
      </div>

      <div className="spacing">
        <Button>클릭</Button>
      </div>

      <Card>
        <h3>카드 제목</h3>
        <p>카드 내용입니다</p>
      </Card>
    </div>
  );
}

export default App;
