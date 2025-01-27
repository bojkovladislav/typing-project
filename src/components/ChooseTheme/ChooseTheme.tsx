import Button from '../ui/Button/Button';

function ChooseTheme() {
  return (
    <Button
      text="themes"
      action={() => console.log('open modal')}
      tabIndex={2}
    />
  );
}

export default ChooseTheme;
