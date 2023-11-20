import { IChildrenProps } from '@/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deeds Counter'
};

export default function RootLayout({ children }: IChildrenProps) {
	return (
		<html lang="en">
			<body
				className={inter.className}
			>
				<div className={'main-wrapper'}>
					{children}
				</div>
			</body>
		</html>
	);
};
