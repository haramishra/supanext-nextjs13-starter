import { UpdateEmail } from "./update-email"
import { UpdateName } from "./update-name"

function AccountForm() {
  return (
    <div className="space-y-6">
      <UpdateName />
      <UpdateEmail />
    </div>
  )
}

export default AccountForm
