
// 사진 등록 : <input type="file" accept="default.jpg"><br/> 25-03-18 사진등록 고민

export default function Member_Input ( props ) {
    return (<>
        <h3> 회원 등록 페이지 </h3>
        <form>
            사원 번호 : <input type="text" name="mno"/><br/>
            사원 이름 : <input type="text" name="mname"/><br/>
            연 락 처 : <input type="text" name="mphone"/><br/>
            사원 이메일 : <input type="text" name="memail"/><br/>
            직 급 : <input type="text" name="mrank"/><br/>
            사진 등록 : <input type="file" accept="image/*"/><br/>

            <button type="button"> 회원 등록</button>
        </form>
        </>)
    }