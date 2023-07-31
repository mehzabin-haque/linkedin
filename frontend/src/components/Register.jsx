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
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input variant="standard" size="lg" label="Name" />
          <Input variant="standard" size="lg" label="Email" />
          <Input variant="standard" type="password" size="lg" label="Password" />
        </div>
        {/* <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors text-blue-500 hover:text-blue-700"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        /> */}
        <Button ripple={true} className="mt-6 tracking-[2px] text-sm rounded-full" fullWidth >
          Sign Up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Button onClick={onButtonClick} size='lg' variant="text">Sign In</Button>
        </Typography>
      </form>
    </Card>
  );
}
