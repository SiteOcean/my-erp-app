

const LoginSection = () => {

    return (<div className="flex justify-center items-center h-[90vh]">
        <div className="rounded-sm p-6 border-4 space-y-2">
            <h3 className="text-center">Login</h3>
            <div className="space-y-6">

                <div className="flex flex-col gap-y-1">
                    <label htmlFor="">UserName: </label>
                <input type="text" className="rounded-sm" name="" id="" />
                </div>

                <div className="flex flex-col gap-y-1">
                    <label htmlFor="">Password:</label>
                <input type="text" className="rounded-sm" name="" id="" />

                </div>
              
            </div>
        </div>
    </div>)
}
export default LoginSection