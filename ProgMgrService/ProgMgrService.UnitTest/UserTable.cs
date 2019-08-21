using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DataAccessLayer;
using ProgMgrService;
using ProgMgrService.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;


namespace ProgMgrService.UnitTest
{
    [TestClass]
    public class UserTable
    {
        [TestMethod]
        public void Test_Get_Pos()
        {
            usertableController obj = new usertableController();
            var actual1 = obj.Get();
           
            //IEnumerable<UserTable> actual = (IEnumerable<UserTable>)obj.Get();
            int actualCount = actual1.ToList().Count;
            int expectedCount = 1;
            //Negative Test case
            Assert.AreEqual(expectedCount, actualCount);
        }

        
        [TestMethod]
        public void Test_Get_Params_Neg()
        {
            int inputVal = 6;
            usertableController obj = new usertableController();
            bool actual = obj.GetbyRow4Testing(inputVal);

            bool expectedCount = true;
            //Positive Test case
            Assert.AreEqual(expectedCount, actual);
        }

        [TestMethod]
        public void Test_Post_Pos()
        {
            
            usertableController obj = new usertableController();
            bool actualRes = obj.Post4Testing(0);
            bool expectedRes = true;
            Assert.AreEqual(expectedRes, actualRes);
        }

        [TestMethod]
        public void Test_Put_Pos()
        {
            usertableController obj = new usertableController();
            bool actualRes = obj.Put4Testing(0);
            bool expectedRes = true;
            Assert.AreEqual(expectedRes, actualRes);
        }

        [TestMethod]
        public void Test_Delete_Pos()
        {
            int delRow = 5;
            usertableController obj = new usertableController();
            bool actualRet = obj.Delete4Testing(delRow);
            bool expectedRet = true;
            Assert.AreEqual(expectedRet, actualRet);
        }

        [TestMethod]
        public void Test_Delete_Neg()
        {
            int delRow = 5;
            usertableController obj = new usertableController();
            bool actualRet = obj.Delete4Testing(delRow);
            bool expectedRet = false;
            Assert.AreEqual(expectedRet, actualRet);
        }

    }
}

