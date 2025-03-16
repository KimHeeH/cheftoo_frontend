function CheckNewUser(responseData) {
  console.log("checkUser함수가 실행되었습니다");
  if (!responseData) return;

  console.log(responseData.isNewUser); // 백엔드 응답 확인

  if (responseData.isNewUser) {
    console.log("새로운 사용자입니다.");
  } else {
    console.log("가입된 사용자입니다.");
  }
}

export default CheckNewUser;
