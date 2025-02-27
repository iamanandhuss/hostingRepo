import express from 'express';
const adminRouter = express.Router();
import {upload} from '../uploads/cloudinary.mjs'



import {adminLogin,loginCred,adminlogOut} from '../controller/adminControllers/adminAuth.mjs'
import {blockproduct,unblockproduct,viewDetails,productDetails,addProduct,editProduct,updateProduct,addQuantity,createProduct} from '../controller/adminControllers/productManagement.mjs'
import {is_adminLogedin,is_adminLogedOut} from '../middleware/admin/adminAuth.mjs'
import { dashboard } from '../controller/adminControllers/dashBoard.mjs';
import {view_order_list,order_manage,changeStatus} from '../controller/adminControllers/orderManager.mjs'
import {view_categories,unblockcategory,blockcategory,addCategory,createCategory,viewproduct} from'../controller/adminControllers/categoryManager.mjs'
import {listUser,blockUser,unblockUser,userDetails} from '../controller/adminControllers/userManager.mjs'
import {manage_coupons,addCoupons,view_coupon_details,editCoupon} from '../controller/adminControllers/couponManager.mjs'
import {refund} from '../controller/adminControllers/refundManager.mjs'
import {create_Offers,addOffers,offersDetails,editOffer} from '../controller/adminControllers/offerControllers.mjs'
import {view_banner,uploadBanner,changeBanner} from '../controller/adminControllers/bannerController.mjs'


//home page for admin desides admin in loge in or not
adminRouter.get('/',(req,res)=>{
    if(req.session.adminEmail){ 
        res.redirect('/admin/dashboard')
    }
    else{
        res.redirect('/admin/login')
    }
})
//credentials
adminRouter.get('/login',is_adminLogedOut,adminLogin)//login page
adminRouter.post('/admin_login',is_adminLogedOut,loginCred)//post login page
adminRouter.get('/logout',is_adminLogedin,adminlogOut)//logout
 
//dashboard
adminRouter.get('/dashboard',is_adminLogedin,dashboard)
adminRouter.get('/view_order_list',is_adminLogedin,view_order_list)




//product 
adminRouter.get('/view_all_products',is_adminLogedin,productDetails)
adminRouter.get('/view_product_details/:id',is_adminLogedin,viewDetails)//view product
adminRouter.get('/blockproduct/:id',is_adminLogedin,blockproduct);//block product
adminRouter.get('/unblockproduct/:id',is_adminLogedin,unblockproduct);//unblock product
adminRouter.get('/addProduct',is_adminLogedin,addProduct);//add product
adminRouter.post('/products',upload.array('image',3),createProduct)


 

adminRouter.get('/editProduct/:id',is_adminLogedin,editProduct)
adminRouter.post('/editProduct/:id',is_adminLogedin,updateProduct)
adminRouter.post('/addQty',addQuantity)

 
 


//categories
adminRouter.get('/view_categories',is_adminLogedin,view_categories)//view categories
adminRouter.get('/unblockcategory/:id',is_adminLogedin,unblockcategory,)//unblock categories
adminRouter.get('/blockcategory/:id',is_adminLogedin,blockcategory)//block categories
adminRouter.get('/addCategory',is_adminLogedin,addCategory)
adminRouter.post('/add_category',is_adminLogedin,createCategory)
adminRouter.get('/viewInformation/:id',is_adminLogedin,viewproduct)

 

///user
adminRouter.get('/manage_users',is_adminLogedin,listUser)//view user list
adminRouter.get('/blockUser/:id',is_adminLogedin,blockUser)
adminRouter.get('/unblockUser/:id',is_adminLogedin,unblockUser)
adminRouter.get('/userDetails/:id',is_adminLogedin,userDetails)


// order
adminRouter.get('/order_manage',is_adminLogedin,order_manage)
adminRouter.post('/newStatus',is_adminLogedin,changeStatus)
adminRouter.post('/data',is_adminLogedin,updateProduct)


// refund
adminRouter.get('/refund',refund)

 
 
// coupons
adminRouter.get('/manage_coupons',is_adminLogedin,view_coupon_details)
adminRouter.post('/coupons',is_adminLogedin,addCoupons)
adminRouter.get('/coupons/',is_adminLogedin,manage_coupons)
adminRouter.post('/editCoupon',is_adminLogedin,editCoupon)

//offers
adminRouter.get('/manage_offers',is_adminLogedin,create_Offers)
adminRouter.put('/create-offer',is_adminLogedin,addOffers)
adminRouter.get('/offersDetails/:id',is_adminLogedin,offersDetails)
adminRouter.post("/editOffer", editOffer);


// banner
adminRouter.get('/view_banner',is_adminLogedin,view_banner)
adminRouter.post('/upload_banner',is_adminLogedin,upload.array('image',1),uploadBanner)
adminRouter.get('/changeBanner',is_adminLogedin,changeBanner)


export default adminRouter;   