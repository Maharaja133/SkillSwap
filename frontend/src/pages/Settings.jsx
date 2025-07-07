import ProfileForm from "../components/settings/ProfileForm";
import AvailabilityForm from "../components/settings/AvailabilityForm";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">User Settings</h2>

      <div className="space-y-10">
        <ProfileForm />
        <AvailabilityForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
