import { SelectRoleForm } from '@/features/auth/components/select-role-form';

export default function SelectRoleLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto flex h-screen items-center justify-center">
        <div className="w-full max-w-md">
          <SelectRoleForm />
        </div>
      </div>
    </div>
  );
}
