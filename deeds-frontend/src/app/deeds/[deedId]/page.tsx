import type { ISearchDeedsPageProps } from "@/types";
import DeedsPanel from "@/components/DeedsPanel/DeedsPanel";

const SearchDeedsPage = ({ params }: ISearchDeedsPageProps) => {
    return (
		<main>
			<DeedsPanel
				filter={{
					deedId: params.deedId ? parseInt(params.deedId) : undefined
				}}
			/>
		</main>
    );
};

export default SearchDeedsPage;