import { UserProfile, OrganizationProfile } from "@clerk/nextjs";
import { useOrganization } from "@clerk/nextjs";

const AdminOrganization = () => {
  const { organization } = useOrganization();

  return (
    <>
      {organization ? <OrganizationProfile /> : <UserProfile />}
    </>
  );
};

export default AdminOrganization;
