import DeedsPanel from "@/components/DeedsPanel/DeedsPanel";
import { ISearchDeedsProps } from "@/types";

const SearchDeeds = ({ params }: ISearchDeedsProps) => {
    return (
		<main>
			<DeedsPanel
				filter={{
					deedId: params.deedId
				}}
			/>
		</main>
    );
};

export default SearchDeeds;