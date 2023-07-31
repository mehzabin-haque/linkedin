import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Login( {onButtonClick} ) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h3" color="blue">
        Sign In
      </Typography>

      <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input variant="standard" size="lg" label="Email" />
          <Input variant="standard" type="password" size="lg" label="Password" />
        </div>
        <Button ripple={true} className="mt-6 tracking-[2px] text-sm rounded-full" fullWidth >
          Sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          {/* <Link
            href="/register"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign Up
          </Link> */}
          <Button onClick={onButtonClick} size='lg' variant="text">Sign Up</Button>
        </Typography>
      </form>
    </Card>
  );
}
