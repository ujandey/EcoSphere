export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="flex items-center gap-2 font-bold text-2xl text-green-700 dark:text-green-400 mb-8">
        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-white text-sm">Eco</span>
        </div>
        <span>EcoScore</span>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Account Created Successfully!</h1>
        <p className="mb-6">Your account has been created. You can now sign in with your credentials.</p>
        <a
          href="/login"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        >
          Go to Login
        </a>
      </div>
    </div>
  )
}
