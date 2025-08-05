import { useOwnerContext } from "@/lib/context/owner";
import AddStaffMember from "./add.new.member.content";
import editPermission from "./edit.permission.content";

function AddStaff() {
	const { staffManageModal } = useOwnerContext();

	const res: any = () => {
		switch (staffManageModal) {
			case "add_staff":
				return AddStaffMember();
			case "edit_pms":
				return editPermission();
		}
	};

	return res();
}

export default AddStaff;
