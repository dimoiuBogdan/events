import { Form, Formik } from "formik";
import useUserApi from "../../../../common/components/User/data/hooks/useUser.api";
import ProfileDataImage from "./ProfileDataImage/ProfileDataImage";
import ProfileDataProperty from "./ProfileDataProperty";
import { getProfileDataInitialValues } from "./data/helpers/profile-data.helper";
import { profileDataValidationSchema } from "./data/helpers/profile-data.validation-schema";

const ProfileData = () => {
  const { userData } = useUserApi();

  if (!userData) return <></>;

  return (
    <Formik
      enableReinitialize
      initialValues={getProfileDataInitialValues(userData)}
      onSubmit={() => {}}
      validationSchema={profileDataValidationSchema}
    >
      <Form className="flex flex-col gap-y-4">
        <ProfileDataImage />
        <ProfileDataProperty
          name="email"
          data={userData?.email}
          label="Email"
          type="email"
        />
        <ProfileDataProperty
          name="first_name"
          data={userData?.first_name}
          label="First Name"
        />
        <ProfileDataProperty
          name="last_name"
          data={userData?.last_name}
          label="Last Name"
        />
        <ProfileDataProperty
          name="phone_number"
          data={userData?.phone_number}
          label="Phone Number"
          type="tel"
        />
      </Form>
    </Formik>
  );
};

export default ProfileData;
/*
 * DOCS :
 * Represents the profile specific data
 * Holds multiple user related properties
 */
