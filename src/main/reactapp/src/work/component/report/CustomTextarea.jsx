
export default function CustomTextarea({ name, value, onChange, isReadOnly }) {
  return (
    <textarea
      style={{
        width: '97%',
        height: '90%',
        border: 'none',
        resize: 'none',
        outline: isReadOnly ? 'none' : '',
        marginTop: 4,
        fontSize: '15px',
        lineHeight: '25px',
        backgroundColor: 'transparent', // 배경색 이슈 방지
      }}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
      onFocus={(e) => e.target.style.border = 'none'} // focus 시 테두리 제거
    />
  );
}
