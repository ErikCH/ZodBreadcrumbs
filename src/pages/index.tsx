import { Heading, Flex, View, TextField, Button } from "@aws-amplify/ui-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "@aws-amplify/ui-react/styles.css";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  // 1 fromEntries
  // const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const { firstName } = Object.fromEntries(
  //     new FormData(event.target as HTMLFormElement)
  //   );
  //   console.log(firstName);
  // };

  const onSubmit: SubmitHandler<ValidationSchema> = event => {
    console.log("event", event);
  };

  // 2 onChange handler
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event", event.target.value);
    setFirstName(event.target.value);
  };

  const validationSchema = zod.object({
    firstName: zod.string().min(3),
    lastName: zod.string().min(10),
    address: zod.string().min(10)
  });
  type ValidationSchema = zod.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  return (
    <Flex justifyContent="center" direction="column" alignItems="center">
      <Heading level={1}>Enter Your Information below</Heading>
      <div>{firstName}</div>
      <Flex
        as="form"
        direction={"column"}
        gap="1rem"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="First Name"
          placeholder="First name"
          onChange={onChange}
        />
        <TextField
          label="Last Name"
          placeholder="Last name"
          {...register("lastName")}
        />
        <TextField
          label="Street Address"
          placeholder="Street Address"
          {...register("address")}
        />
        <div>{errors.address?.message}</div>
        <Button type="submit">Submit Form</Button>
      </Flex>
    </Flex>
  );
}
