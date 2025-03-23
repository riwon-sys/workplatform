
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
        lineHeight: '25px'
      }}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
    />
  );
}
