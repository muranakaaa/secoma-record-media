import Navigation from "../../components/navigation/Navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-2">
        <div className="flex flex-col items-center justify-center text-sm space-y-5">
          <div>©FullStackChannel. ALL Rights Reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout