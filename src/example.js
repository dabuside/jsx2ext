export default `form.items = 
<>
  <RadioGroup itemId="ext-jsx" vmodel={long_varable_name} name={_('nice boat')}>
    <Radio checkedValue="A" defaultChecked></Radio>
    <Radio checkedValue="B"></Radio>
    <Radio checkedValue="C"></Radio>
    // i am comment
    <RadioGroup>
      <Radio checkedValue="D"></Radio>
      <Radio checkedValue="E"><myCustomInnerXtype/></Radio>
    </RadioGroup>
  </RadioGroup>
  {new Grid({ext_in_jsx: 'awesome'})}
</>
`;
