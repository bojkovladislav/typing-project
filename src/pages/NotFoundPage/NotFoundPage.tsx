import { HomeOutlined } from '@ant-design/icons';
import Button from '../../components/ui/Button/Button';
import { IconPosition } from '../../types/enums';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router';

function NotFoundPage() {
  const { currentTheme } = useTheme();

  return (
    <div className="flex gap-10 items-stretch self-center">
      <img
        src="public/404_image.jpeg"
        className="h-full object-contain max-h-[400px]"
      />

      <div className="flex flex-col justify-between">
        <h1 className="text-9xl" style={{ color: currentTheme.text.correct }}>
          404
        </h1>

        <div className="flex flex-col gap-5">
          <p className="text-3xl" style={{ color: currentTheme.text.neutral }}>
            Ooops! Looks like this page or resource doesn't exist.
          </p>

          <Link to="/" className="default-clear">
            <Button
              text="Go Home"
              fill
              icon={<HomeOutlined />}
              iconPosition={IconPosition.START}
              action={() => {}}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
